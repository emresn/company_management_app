echo ">>> postgresql restart"
sudo service postgresql restart
echo ">>> activating the .venv."
source ../venv1/bin/activate
python3 manage.py runserver

