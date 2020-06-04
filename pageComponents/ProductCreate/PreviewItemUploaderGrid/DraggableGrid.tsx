
import React, { Component } from 'react';
import { arrayMove, SortableElement, SortableContainer } from 'react-sortable-hoc';



export const GridItem = SortableElement((props) => {
  const { value } = props;
  return (
    <div style={{
      height: '55px',
      width: '88px', // 1.6 ratio
      backgroundColor: '#e5e5e5',
      borderRadius: '4px',
    }}>
      {value}
    </div>
  )
});


export const Grid = SortableContainer((props) => {

  const {
    numColumns = 3,
    children
  } = props;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
      gridGap: '12px',
      // maxWidth: 'calc(5 * 88px)',
    }}>
      {
        children &&
        children.length &&
        children.map((value, index) =>
          <GridItem
            key={`item-${index}`}
            index={index}
            value={value}
          />
        )
      }
    </div>
  )
});



// Not used, example only
class DraggableGrid extends Component<any, any> {

  state = {
    items: [1,2,3,4,5,6,7,8,9,10].map(index => `Item ${index}`),
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };


  render() {
    return (
      <Grid
        items={this.state.items}
        onSortEnd={this.onSortEnd}
        axis="xy"
      >
        {
          this.state.items.map(i => {
            return <div key={i}>{i}</div>
          })
        }
      </Grid>
    )
  }
}


export default DraggableGrid;