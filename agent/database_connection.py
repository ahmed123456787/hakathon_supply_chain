from sqlalchemy import create_engine, text, Connection
from urllib.parse import quote_plus

password = quote_plus('test123$')

# Connection details (modify as needed)
server = 'server-test-test-def.database.windows.net'
database = 'my_database'
username = 'hakathon'
driver = 'ODBC Driver 17 for SQL Server'

def create_connection() -> Connection:
    connection_string = f'mssql+pyodbc://{username}:{password}@{server}/{database}?driver={driver.replace(" ", "+")}'
    engine = create_engine(connection_string,connect_args={"autocommit": True})
    return engine.connect()
