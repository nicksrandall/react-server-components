import { createElement as h } from 'react'
import { shipDataStorage } from '../server/async-storage.js'
import { getImageUrlForShip } from './img-utils.js'

export function SearchResults() {
	const {
		shipId: currentShipId,
		shipResults,
		search,
	} = shipDataStorage.getStore()
	return shipResults.ships.map(ship => {
		const href = [
			`/${ship.id}`,
			search ? `search=${encodeURIComponent(search)}` : null,
		]
			.filter(Boolean)
			.join('?')
		return h(
			'li',
			{ key: ship.name },
			h(
				'a',
				{
					style: { fontWeight: ship.id === currentShipId ? 'bold' : 'normal' },
					href,
				},
				h('img', {
					src: getImageUrlForShip(ship.id, { size: 20 }),
					alt: ship.name,
				}),
				ship.name,
			),
		)
	})
}
