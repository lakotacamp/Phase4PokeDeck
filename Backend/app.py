from flask import request, session
from sqlalchemy.exc import IntegrityError
from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from config import app, db, api
from model import db, Team, Pokemon , PokeTeam, Trainer
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


@app.route('/')
def home():
    return ''


@app.before_request
def route_filter():
    bypass_routes = ["signup","login"]
    if request.endpoint not in bypass_routes and not session.get("user_id"):
        return {"Error": "Unauthorized"},401
    
@app.route('/signup',methods=['POST'])
def signup():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            new_trainer = Trainer(
                username = data["username"],
                 _password_hash = data["password"]
                
            )
            new_trainer.password_hash = data["password"]
            db.session.add(new_trainer)
            db.session.commit()
            session['trainer_id'] = new_trainer.id
            return new_trainer.to_dict(rules = ('-teams','-password_hash')),201
        except Exception as e:
            print(e)
            return {"Error": "Could not make trainer"},422
        
@app.route('/checksession',methods=['GET'])
def check_session():
    if request.method == 'GET':
        print(session)
        user = Trainer.query.filter(Trainer.id == session["trainer_id"]).first()
        return user.to_dict(rules = ('-teams','-password_hash')),200
    
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        trainer = Trainer.query.filter(Trainer.username == data["username"]).first()
        if trainer and trainer.authenticate(data['password']):
            session['trainer_id'] = trainer.id
            print(session)
            return trainer.to_dict(rules = ('-teams','-password_hash')),200
        else:
            return {"Error": "Not valid trainer name or password"}, 401
        

@app.route('/logout', methods=['DELETE'])
def logout():
    if request.method == 'DELETE':
        session['trainer_id'] = None
        return {},204
    
@app.route('/teams', methods = ['GET','POST'])
def team_route():
    if request.method == "GET":
        all_teams = Team.query.all()
        dict_teams = []
        for team in all_teams:
            dict_teams.append(team.to_dict())
        return make_response(dict_teams,200)
    elif request.method == "POST":
        try:
            data = request.get.json()
            new_team = Team(
                name = data['name'])
            db.session.add(new_team)
            db.session.commit()
            return make_response(new_team.to_dict())
        except:
            return make_response({"errors": ["validation errors"]},400)
        
@app.route('/teams/<int:id>', methods = ['GET', 'PATCH','DELETE'])
def one_team_route(id):
    found_team = Team.query.filter(Team.id==id).first()
    if found_team:
        if request.method == "GET":
            return make_response(found_team.to_dict(),200)
        elif request.method == "PATCH":
            try:
                data = request.get_json()
                for attr in data:
                    setattr(found_team,attr,data[attr])
                db.session.add(found_team)
                db.session.commit()
                return make_response(found_team.to_dict(),202)
            except:
                return make_response({"errors": ["validation errors"]},400)
        elif request.method == "DELETE":
            db.session.delete(found_team)
            db.session.commit()
            return make_response({},204)
    else:
        return make_response({"error": "Team not found"},404)
        
@app.route('/pokemon')
def pokemon_route():
    all_pokemons = Pokemon.query.all()
    dict_pokemons = []
    for i, pokemon in enumerate(all_pokemons):
        if i < 12:
            dict_pokemons.append(pokemon.to_dict())
    return make_response(dict_pokemons,200)

@app.route('/poketeam', methods=['POST','DELETE'])
def poketeam_route():
    if request.method == "POST":
        try:
            data = request.get_json()
            new_poketeam = PokeTeam(
                team_id = data['team_id'],
                pokemon_id = data['pokemon_id'],
            )
            db.session.add(new_poketeam)
            db.session.commit()
            return make_response({},204)
        except:
            return make_response(new_poketeam.to_dict(),201)
    elif request.method == "DELETE":
        db.session.delete(new_poketeam)
        db.session.commit()
        return make_response({},204)
    
@app.route('/save-team', methods=['POST', 'PATCH'])
def save_team():
    if request.method == "POST":
        data = request.get_json()

        # Retrieve the trainer ID from the session
        trainer_id = session.get("trainer_id")

        if trainer_id:
            new_team = Team(name=data['team_name'], trainer_id=trainer_id)
            db.session.add(new_team)
            db.session.commit()

            for pokemon_name in data['pokemon_names']:
                new_pokemon = Pokemon(name=pokemon_name)
                db.session.add(new_pokemon)
                db.session.commit()

                new_poketeam = PokeTeam(team_id=new_team.id, pokemon_id=new_pokemon.id)
                db.session.add(new_poketeam)

            try:
                db.session.commit()
                return jsonify(message='Team and Pokemon Created'), 201
            except Exception as e:
                db.session.rollback()
                return jsonify(error=str(e), message='An error occurred, please try again'), 500

    elif request.method == "PATCH":
        data = request.get_json()

        team_id = data.get('team_id')
        existing_team = Team.query.get(team_id)

        if not existing_team:
            return jsonify(error='Team not found'), 404

        if 'team_name' in data:
            existing_team.name = data['team_name']
            
        if 'pokemon_names' in data:
            existing_team.poke_teams = []

            for pokemon_name in data['pokemon_names']:
                existing_pokemon = Pokemon.query.filter_by(name=pokemon_name).first()

                if not existing_pokemon:
                    existing_pokemon = Pokemon(name=pokemon_name)
                    db.session.add(existing_pokemon)
                    db.session.flush()

                new_poketeam = PokeTeam(team_id=existing_team.id, pokemon_id=existing_pokemon.id)
                db.session.add(new_poketeam)

        try:
            db.session.commit()
            return jsonify(message='Team updated successfully'), 200
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e), message='An error occurred while updating the team'), 500


"""
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
"""

if __name__ == '__main__':
    app.run(port=5555, debug=True)
        


# team- full CRUD
# pokemon- get
# poketeam- post delete
# 