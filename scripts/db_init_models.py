import random
import requests
import unicodedata
import json
import argparse
import time

def read_list_from_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return [line.strip() for line in f]


first_names = read_list_from_file("data\\first_names.txt")
surnames = read_list_from_file("data\\surnames.txt")
telephones = read_list_from_file("data\\telephones.txt")
streets = read_list_from_file("data\\streets.txt")
cities = read_list_from_file("data\\cities.txt")
specializations = read_list_from_file("data\\specializations.txt")

def normalize_to_ascii(text):
    decomposed = unicodedata.normalize('NFD', text)
    ascii_text = ''.join(char for char in decomposed if unicodedata.category(char) != 'Mn')
    return ascii_text

def generate_random_person(is_doctor):
    first_name = normalize_to_ascii(random.choice(first_names))
    surname = normalize_to_ascii(random.choice(surnames))
    specialization = ""
    
    if (is_doctor):
        specialization = normalize_to_ascii(random.choice(specializations))
    
    person = {
        "pin": str(epoch_time := int((time.time() * 1000))),
        "specialization": specialization,
        "isDoctor": is_doctor,
        "first_name": first_name,
        "surname": surname,
        "telephone": random.choice(telephones),
        "email": f"{first_name.lower()}.{surname.lower()}@gmail.com",
        "address_street": normalize_to_ascii(random.choice(streets)),
        "address_city": normalize_to_ascii(random.choice(cities)),
        "password": first_name + surname
    }
    return person

def db_fill(role, number):
    url = "http://127.0.0.1:8000/allmed_api/register"
    i = 0

    with open(f"filled_{role}s.txt", "w", encoding='utf-8') as f:
        for _ in range(number):
            person_data = generate_random_person(True if role == 'doctor' else False)
            f.write(json.dumps(person_data) + '\n')
            response = requests.post(url, json=person_data)
            if response.status_code != 201:
                print(f"Failed to register person: {person_data} due to duplicity")
            else:
                i += 1

        print(f"Successfully registered {i} {role}s.")


def process_fill_by_role(role, number):
    if role == 'doctor' or role == 'patient':
        db_fill(role, number)
    else:
        raise ValueError("Invalid role. Must be 'doctor' or 'patient'.")


parser = argparse.ArgumentParser()
parser.add_argument('role', choices=['doctor', 'patient'])
parser.add_argument('number', type=int)
args = parser.parse_args()

process_fill_by_role(args.role, args.number)

