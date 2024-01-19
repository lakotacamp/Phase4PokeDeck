from sqlalchemy import ForeignKey, Column, Integer, String, create_engine
from sqlalchemy.orm import Session, declarative_base, relationship, validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

Base = declarative_base()


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
# id that is an integer type and a primary key.
    id = db.Column(db.Integer, primary_key = True)
# username that is a String type.
    username = db.Column(db.String, unique = True, nullable = False)
# _password_hash that is a String type.
    _password_hash = db.Column(db.String)
    """
# image_url that is a String type.
    image_url = db.Column(db.String)
# bio that is a String type.
    bio = db.Column(db.String)
    """

    recipes = db.relationship('Recipe', back_populates = "user")
    
    serialize_rules = ('-recipes.user',)

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Can't access this")
        # return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        hashed_password = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = hashed_password.decode('utf-8')

    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    @validates('username')
    def validate_username(self,key,value):
        if value:
            return value
        else:
            raise ValueError("Not valid username")


class Team(Base,SerializerMixin):
    __tablename__= "teams"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    poke_teams = db.relationship("PokeTeam", back_populates="team")

    def __repr__(self):
        return repr(f"{self.name}")

class Pokemon(Base):
    __tablename__= "pokemons"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    poke_teams = db.relationship("PokeTeam", back_populates="pokemon")

    def __repr__(self):
        return repr(f"{self.name}")

class PokeTeam(Base):
    __tablename__ = "poke_teams"
    id = db.Column(db.Integer, primary_key = True)
    team_id = db.Column(db.Integer, ForeignKey("teams.id"))
    team = db.relationship("Team", back_populates="poke_teams")
    pokemon_id = db.Column(db.Integer, ForeignKey("pokemons.id"))
    pokemon = db.relationship("Pokemon", back_populates="pokemons")

    def __repr__(self):
        return repr(f"{self.name}")


#engine = create_engine("sqlite:///darktide_builder.db")
