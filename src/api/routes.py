"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app= Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_KEY")  # Change this!
jwt = JWTManager(app)

bcrypt = Bcrypt(app)

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register',methods=['POST'])
def register():
    body=request.get_json(silent=True)
    if body == None:
        return jsonify({'msg': 'email y password obligatorios'})
    if 'email' not in body:
        return jsonify({'msg': 'email obligatorio'})
    if 'password' not in body:
        return jsonify({'msg': 'password obligatorio'}) 
    user = User.query.filter_by(email=body['email']).first()
    if user is not None:
        return jsonify({'msg': f'El correo {body["email"]} ya ha sido registrado'}),400
    new_user =User()
    new_user.email = body['email']
    new_user.password = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg':'Nuevo usuario creado con exito'}),201

@api.route('/login', methods=['POST'])
def login():
    email=request.json.get("email",None)
    password= request.json.get("password",None)
    user= User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({'msg':'email o contraseña incorrecta'}),401
    
    access_token=create_access_token(identity=user.id)
    return jsonify({'token':access_token, 'user_id':user.id})
    # body=request.get_json(silent=True)
    # if body == None:
    #     return jsonify({'msg': 'email y passord obligatorios'})
    # if 'email' == None:
    #     return jsonify({'msg': 'email obligatorio'}),400
    # if 'password' == None:
    #     return jsonify({'msg': 'password obligatorio'})
    # user = User.query.filter_by(email=body['email']).first()
    # if user is None:
    #     return jsonify ({'msg':'Correo o contraseña del usuario invalido'})
    # check_password = bcrypt.check_password_hash(user.password, body['password'])
    # if  check_password == False:
    #     return jsonify ({'msg':'Correo o contraseña del usuario invalido'}),401
    # access_token =create_access_token(identity=user.email)
    # return jsonify ({'token':access_token})

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    if user is None:
        raise APIException("usuario no encontrado")
    return jsonify(logged_in_as=current_user), 200