CREATE TABLE IF NOT EXISTS animals (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    breed TEXT,
    days_sheltered INTEGER NOT NULL,
    is_here INTEGER
);

DELETE FROM animals;
DELETE FROM sqlite_sequence WHERE name='animals';

INSERT INTO animals (name, species, breed, days_sheltered, is_here)
VALUES
    ('Speck', 'Dog', 'Jack Russell Terrier', 42, 1),
    ('Stiener', 'Rabbit', 'Netherland Dwarf', 27, 0),
    ('Captain', 'Parrot', 'Blue Macaw', 39, 1),
    ('Precious', 'Dog', 'Shiba Inu', 22, 1),
    ('Athena', 'Gecko', 'Crested Gecko', 40, 0),
    ('Pepper', 'Cat', 'Maine Coon', 15, 1);