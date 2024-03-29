#!/bin/sh

# Grant privileges to the user
sql="GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO '${MYSQL_USER}'@'%';"

echo "Executing SQL: ${sql}"

mysql -u root -p${MYSQL_ROOT_PASSWORD} -e "${sql}"
