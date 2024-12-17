document.addEventListener('DOMContentLoaded', () => {
    console.log("fetching animals");
    fetchAnimals();
});

async function fetchAnimals() { // this took waaaaayyyyyyyyyyyyy too long even with experience and research, might be helpful to talk longer about this stuff in the future
    try {
        const response = await fetch('/api/animals');
        const animals = await response.json();

        const tableBody = document.querySelector('#animal-table tbody');
        tableBody.innerHTML = '';

        animals.forEach(animal => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${animal.id}</td>
                <td>${animal.name}</td>
                <td>${animal.species}</td>
                <td>${animal.breed || 'Unknown'}</td>
                <td>${animal.days_sheltered}</td>
                <td>${animal.is_here ? 'Yes' : 'No'}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('fetch catch error', error);
    }
}

document.getElementById('add-animal-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('animal-name').value;
    const species = document.getElementById('animal-species').value;
    const breed = document.getElementById('animal-breed').value;
    const days_sheltered = parseInt(document.getElementById('animal-days-sheltered').value, 10);
    const is_here = document.getElementById('animal-is-here').checked ? 1 : 0;

    console.log({ name, species, breed, days_sheltered, is_here });

    try {
        const response = await fetch('/api/animals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name, species, breed, days_sheltered: days_sheltered, is_here: is_here
            }),
        });

        if (response.ok) {
            alert('animal created');
            fetchAnimals();
        } else {
            alert('create failed');
        }
    } catch (error) {
        console.error('create catch error', error);
    }
});

document.getElementById('delete-animal-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('delete-id').value;

    if (!id) {
        alert('id error');
        return;
    }

    try {
        const response = await fetch(`/api/animals/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('animal deleted');
            fetchAnimals();
        } else {
            alert('deletion failed');
        }
    } catch (error) {
        console.error('deletion catch error', error);
    }
});

