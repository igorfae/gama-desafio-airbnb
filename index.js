const cards = document.getElementById('cards');
const url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';

const getJSON = () => {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.open('get', url, true);
		xhr.responseType = 'json';
		xhr.onload = () => {
			var status = xhr.status;
			if (status == 200) {
			resolve(xhr.response);
			} else {
			reject(status);
			}
		};
		xhr.send();
	});
};

getJSON().then(data => {
	filtrarTipos('');
}) 

const filtrarTipos = (filtro) => {
	getJSON().then(data => {
		const filtrados = data.filter((acomodacao) => {
			if (filtro == '') {
				return acomodacao;
			}
      return acomodacao.property_type == filtro;
		})		
		cards.innerHTML = '';
		filtrados.map(card => {
			const newCard = document.createElement('div')
			newCard.setAttribute('class', 'col-md-4');
			let price = (card.price).toFixed(2);
			newCard.innerHTML = `
			<div class="card mb-4 shadow-sm">
				<img src="${card.photo}" width="100%" height="225">            
				<div class="card-body">
					<p class="card-text">${card.name}</p>
					<div class="d-flex justify-content-between align-items-center">
						<div class="card-text">
						<p class="card-text">${card.property_type}</p>
						</div>
						<small class="text-muted">R$ ${price}</small>
					</div>
				</div>
			</div>
			`;
		cards.appendChild(newCard);	
		})
	})	
}