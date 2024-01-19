import requests
from app import app 
from model import db, Team, Trainer, Pokemon, PokeTeam

def seed_pokemon_data():
    api_url = 'https://pokeapi.co/api/v2/pokemon/'
    response = requests.get(api_url)

    if response.status_code: 
        pokemon_data = response.json()
        print(pokemon_data)
        for pokemon in pokemon_data['results']:
            name = pokemon['name']
            new_pokemon = Pokemon(**Pokemon(name=name).to_dict())
            db.session.add(new_pokemon)
            db.session.commit()

            print('Pokemon data seeded successfully.')
    else:
        print('Failed to fetch Pokemon data')

if __name__ == '__main__':
    seed_pokemon_data()