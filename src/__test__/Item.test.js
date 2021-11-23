import React from 'react'
import renderer from 'react-test-renderer'
import Item from '../components/Item'

test('Link changes the class when hovered', () => {
  const props = {
    brandName: 'Balenciaga',
    price: { text: '$150' },
    imageUrl: 'http://127.0.0.1:3000/assets/thumb.png',
    index: 0,
  }
  const component = renderer.create(<Item {...props}/>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
