import random
import requests

def read_list_from_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return [line.strip() for line in f]


first_names = read_list_from_file("first_names.txt")
surnames = read_list_from_file("surnames.txt")
telephones = read_list_from_file("telephones.txt")
streets = read_list_from_file("streets.txt")
cities = read_list_from_file("cities.txt")
specializations = read_list_from_file("specializations.txt")


def generate_random_person():
    first_name = random.choice(first_names)
    surname = random.choice(surnames)
    
    person = {
        "pin": random.randint(1000, 9999),
        "first_name": first_name,
        "surname": surname,
        "telephone": random.choice(telephones),
        "email": f"{first_name.lower()}.{surname.lower()}@gmail.com",
        "address_street": random.choice(streets),
        "address_city": random.choice(cities),
        "specialization": random.choice(specializations),
    }
    return person


url = "http://127.0.0.1:8000/allmed_api/doctors"

for _ in range(100):
    person_data = generate_random_person()
    response = requests.post(url, json=person_data)
    
    assert response.status_code == 200, response.text
