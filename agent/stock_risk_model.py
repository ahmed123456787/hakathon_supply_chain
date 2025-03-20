from database_connection import create_connection
import pandas as pd
from pandas import DataFrame
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib


import numpy as np  # Import NumPy to handle NaN values

def create_dataset() -> DataFrame:
    query = """SELECT 
        p.ProductID,
        p.ProdcutName,
        p.Quantity AS StockQuantity,  
        p.Price,
        p.Cost,
        p.Weight,
        p.SupplierID,
        p.Description,
        COUNT(o.OrderID) AS TotalOrders,
        SUM(o.Quantity) AS TotalSold,  
        AVG(o.TotalAmount) AS AvgOrderValue,
        COUNT(CASE WHEN o.OrderStatus = 1 THEN 1 END) AS CompletedOrders,
        COUNT(CASE WHEN o.OrderStatus = 3 THEN 1 END) AS CancelledOrders,
        COUNT(CASE WHEN o.Feedback LIKE '%good%' OR o.Feedback LIKE '%excellent%' THEN 1 END) AS PositiveFeedback,
        COUNT(CASE WHEN o.Feedback LIKE '%bad%' OR o.Feedback LIKE '%poor%' THEN 1 END) AS NegativeFeedback,
        DATEDIFF(DAY, MIN(o.OrderDate), MAX(o.OrderDate)) AS DaysBetweenOrders,  
        AVG(DATEDIFF(DAY, o.OrderDate, o.ReceiveDate)) AS AvgDeliveryTime  
    FROM 
        Product p
    LEFT JOIN 
        [Order] o ON p.ProductID = o.ProductID
    GROUP BY 
        p.ProductID, p.ProdcutName, p.Quantity, p.Price, p.Cost, p.Weight, p.SupplierID, p.Description
    ORDER BY 
        TotalSold DESC;
    """

    df = pd.read_sql(query, con=create_connection())

    # Handle zero values to prevent division errors
    df["DaysBetweenOrders"] = df["DaysBetweenOrders"].replace(0, np.nan)  # Replace 0 with NaN
    df["SalesVelocity"] = df["TotalSold"] / df["DaysBetweenOrders"]
    df["SalesVelocity"] = df["SalesVelocity"].replace([np.inf, -np.inf], np.nan).fillna(0)  # Remove infinity

    df["StockRunoutTime"] = df["StockQuantity"] / df["SalesVelocity"]
    df["StockRunoutTime"] = df["StockRunoutTime"].replace([np.inf, -np.inf], np.nan).fillna(99999)  # Large value for no risk

    df["HighRisk"] = (df["StockRunoutTime"] < df["AvgDeliveryTime"]).astype(int)

    return df


def main(): 
    df = create_dataset()

    # Features and Target Variable
    X = df[["StockQuantity", "TotalSold", "TotalOrders", "SalesVelocity", "AvgDeliveryTime"]]
    y = df["HighRisk"]

    # Train Model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)

    # Make Predictions on the Entire Dataset
    df["PredictedRisk"] = model.predict(X)

    # Calculate Percentage of Products in High and Low Risk
    total_products = len(df)
    high_risk_count = df["PredictedRisk"].sum()
    low_risk_count = total_products - high_risk_count

    return {
        "high_risk_count": int(high_risk_count),  # Convert to native Python int
        "low_risk_count": int(low_risk_count),    # Convert to native Python int
    }


if __name__ == "__main__":
    main()

