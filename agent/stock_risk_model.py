from database_connection import create_connection
import pandas as pd
from pandas import DataFrame
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


def create_dataset() -> DataFrame:
    query = """SELECT 
    p.ProductID,
    p.ProdcutName,
    p.Quantity AS StockQuantity,  -- Current stock level
    p.Price,
    p.Cost,
    p.Weight,
    p.SupplierID,
    p.Description,
    COUNT(o.OrderID) AS TotalOrders,  -- Total number of orders for this product
    SUM(o.Quantity) AS TotalSold,  -- Total quantity sold
    AVG(o.TotalAmount) AS AvgOrderValue,  -- Average order value
    COUNT(CASE WHEN o.OrderStatus = 1 THEN 1 END) AS CompletedOrders,  -- 1 = Completed
    COUNT(CASE WHEN o.OrderStatus = 3 THEN 1 END) AS CancelledOrders,  -- 3 = Cancelled
    COUNT(CASE WHEN o.Feedback LIKE '%good%' OR o.Feedback LIKE '%excellent%' THEN 1 END) AS PositiveFeedback,  -- Positive reviews count
    COUNT(CASE WHEN o.Feedback LIKE '%bad%' OR o.Feedback LIKE '%poor%' THEN 1 END) AS NegativeFeedback,  -- Negative reviews count
    DATEDIFF(DAY, MIN(o.OrderDate), MAX(o.OrderDate)) AS DaysBetweenOrders,  -- Time between first and last order
    AVG(DATEDIFF(DAY, o.OrderDate, o.ReceiveDate)) AS AvgDeliveryTime  -- Avg delivery time
FROM 
    Product p
LEFT JOIN 
    [Order] o ON p.ProductID = o.ProductID
GROUP BY 
    p.ProductID, p.ProdcutName, p.Quantity, p.Price, p.Cost, p.Weight, p.SupplierID, p.Description
ORDER BY 
    TotalSold DESC;  -- Sort by best-selling products


"""
    # Load query results into Pandas DataFrame
    df = pd.read_sql(query, con=create_connection())
    df["SalesVelocity"] = df["TotalSold"] / df["DaysBetweenOrders"]
    df["StockRunoutTime"] = df["StockQuantity"] / df["SalesVelocity"]
    df["HighRisk"] = (df["StockRunoutTime"] < df["AvgDeliveryTime"]).astype(int)

    return df

def main(): 
    df = create_dataset()
    # Features and Target Variable
    print(df.columns)
    X = df[["StockQuantity", "TotalSold", "TotalOrders", "SalesVelocity", "AvgDeliveryTime"]]
    y = df["HighRisk"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print(classification_report(y_test, y_pred))

if __name__ == "__main__":
    main()