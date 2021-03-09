import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const baseColor = "gray.500"
const star = <i className="fas fa-star"></i>;
const halfStar = <i className="fas fa-star-half-alt"></i>;
const emptyStar = <i class="far fa-star"></i>;

const StarTag = ({style, value}) => {
  console.log(style);
  if (value < 0.25) { return (Array(5).fill("").map((_, i) => (<span style={{ color: baseColor }} key={uuidv4()}>{star}</span>))); }
  else if(value < 0.75) { return <div>
    {(Array(1).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{halfStar}</span>)))}
    {(Array(4).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{emptyStar}</span>)))}</div>
  } else if(value < 1.25) { return <div>
    {(Array(1).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{star}</span>)))}
    {(Array(4).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{emptyStar}</span>)))}</div>
  } else if(value < 1.75) { return <div>
    {(Array(1).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{star}</span>)))}
    {(Array(1).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{halfStar}</span>)))}
    {(Array(3).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{emptyStar}</span>)))}</div>
  } else if(value < 2.25) { return <div>
    {(Array(2).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{star}</span>)))}
    {(Array(3).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{emptyStar}</span>)))}</div>
  } else if(value < 2.75) { return <div>
    {(Array(2).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{star}</span>)))}
    {(Array(1).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{halfStar}</span>)))}
    {(Array(2).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{emptyStar}</span>)))}</div>
  } else if(value < 3.25) { return <div>
    {(Array(3).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{star}</span>)))}
    {(Array(2).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{emptyStar}</span>)))}</div>
  } else if(value < 3.75) { return <div>
    {(Array(3).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{star}</span>)))}
    {(Array(1).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{halfStar}</span>)))}
    {(Array(1).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{emptyStar}</span>)))}</div>
  } else if(value < 4.25) { return <div>
    {(Array(4).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{star}</span>)))}
    {(Array(1).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{emptyStar}</span>)))}</div>
  } else if(value < 4.75) { return <div>
    {(Array(4).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{star}</span>)))}
    {(Array(1).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{halfStar}</span>)))}</div>
  } else { return <div>
    {(Array(5).fill("").map((_, i) => (<span style={ style } key={uuidv4()}>{star}</span>)))}</div>
  }
}
 
export default StarTag;