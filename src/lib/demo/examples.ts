/* eslint-disable no-irregular-whitespace */
export default {
  home: {
    basic: 
`<DataGrid source={getData} items={5} let:data>
  <Column {data}
    header="Product" 
    value={d => d.title} />
  <Column {data}
    header="Brand" 
    value={d => d.brand} />
  <Column {data}
    header="Price"
    value={d => d.price}
    render={p => \`€ \${p.price.toFixed(2)}\`}
    align="right" />
  <ListPaginator />
</DataGrid>`
  }
}
