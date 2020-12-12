from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime 
import json
from json import JSONEncoder
import hashlib
import random
from flask import jsonify
import ctypes
## this will use c as a lib and use it in python
lib = ctypes.CDLL("./largest.so")

def mostRecent(arr):
    a = lib.largest(arr)
    return a

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Thisismysecretekeytoolazytochange'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
# app.config['SERVER_NAME'] = "http://localhost:5000/"
app.config['SERVER_NAME'] = "http://127.0.0.1:5000"


db = SQLAlchemy(app)

db.create_all()



class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(100), unique = True, nullable = False)
    password = db.Column(db.String(64), nullable = False)
    report = db.relationship('Report', lazy = True)
    
    def __repr__(self):
        return f"User( '{self.id}','{self.email}')"


class Report(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    userId = db.Column(db.Integer, db.ForeignKey("user.id"))
    date = db.Column(db.DateTime, default = datetime.utcnow)
    isCloseContact = db.Column(db.Boolean, nullable = False)
    isIsolate = db.Column(db.Boolean, nullable = False)
    isDanger = db.Column(db.Integer, nullable = False)
    
    def __repr__(self):
        return f"Report('{self.id}','{self.date}','{self.isDanger})"

@app.route('/sign-in', methods = ['POST'])
def login():

    requests = request.data
    user_request = json.loads(requests)
    
    user = User.query.filter_by(email = user_request['email']).first()
    if (user == None):
        return jsonify({'msg': 'Bad Email or Password'}), 200
    
    salt = str(random.getrandbits(256))
    pwd = user_request['password'] + salt
    hash = hashlib.sha512(pwd.encode()).hexdigest()  

    if (user.password == hashed):
        session['user'] = user_request['email']
        return jsonify({'user': user.email, 'redirect': '/'}), 200
    else:
        return jsonify({'msg': "Bad Email or Password"}), 200



@app.route('/sign-up', methods= ['POST'])
def register():
    requests = request.data
    user_request = json.loads(requests)

    user = User.query.filter_by(email = user_request['email']).first()
    if (user != None):
        return {'msg': 'Email already in used'}
    
    salt = str(random.getrandbits(256))
    pwd = user_request['password'] + salt
    hash = hashlib.sha512(pwd.encode()).hexdigest() 

    newUser = User(email=user_request['email'], password=hash)
    db.session.add(newUser)
    db.session.commit()    

    return jsonify({'user':newUser.email}), 200




@app.route('/sign-out')
def logout():
    session.pop('user', None)
    return jsonify({})



@app.route('/getUser')
def getCurUser():
    if (session.get('user')):
        return jsonify({"user": session['user']}),200
    else:
        return jsonify({'redirect': 'true'})



@app.route('/getReport', methods = ['GET'])
def getReport():
    user = User.query.filter_by(email = session['user']).first()
    userID = user.id
    re = Report.query.filter_by(user_id = userID).all()
    ## find the recent report
    arr = []
    for re in res:
        arr.append({'id':re.id, 'date':re.date, 'isCloseContact': re.isCloseContact, 'isIsolate':  re.isIsolate, 'isDanger': re.isDanger})
    x = mostRecent(arr.id)
    return jsonify({'report':arr[x]}), 200

#this will saveReport to database
@app.route('/saveReport', methods = ['POST'])
def saveReport():
    req = request.data
    json_req = json.loads(req)

    isCC = json_req['isCloseContact']
    isI = json_req['isIsolate']

    user = User.query.filter_by(email = session['user']).first()
    userID = user.id

    report = Report(user_id = userID, title = isCC, content = isI, date= datetime.utcnow() )
    db.session.add(report)
    db.session.commit()

    return jsonify({'response': "Good"}), 200

#test function
@app.route('/test', methods = ['GET'])
def hello():
    people = [{'name': 'Alice', 'birth-year': 1986},
          {'name': 'Bob', 'birth-year': 1985}]
    return jsonify(people) 

if  __name__ == '__main__':
    app.run(host= "127.0.0.1", debug=True)