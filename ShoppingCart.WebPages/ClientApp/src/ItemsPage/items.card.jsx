import React from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import StarRatingComponent from 'react-star-rating-component';

const ItemsCard = (props) =>{
    const rating = props.rating?props.rating:0;
    const display=props.isAdmin?"inline !important":"none !important";
    
    const style={
      width:"20%", 
      cursor:"pointer",
      display:display
    }
    
   
    return(
        <Col xs="12" sm="6" md="4" style={{marginBottom:"10px"}}>
            <Card className="card-accent-primary">
              <CardHeader >
               <table style={{width:"100%"}}>
                 <tbody>
                 <tr>
                   <td> {props.category}</td>
                   
                   <td style={{width:"10%", cursor:"pointer"}}>
                     {props.isAdmin && 
                      <a className="pull-right" onClick={props.editItem} style={style}>
                        <i className="fa fa-edit text-success" style={{fontSize:"20px", cursor:"pointer"}}></i>
                      </a>
                      }
                   </td>
                   <td align="right" style={{width:"10%", cursor:"pointer"}}>
                     <a className="pull-right" onClick={props.addToCart} >
                     <i className="fa fa-cart-plus text-primary" style={{fontSize:"20px"}}></i>
                     </a>
                   
                   </td>
                 </tr>
                 </tbody>
               </table>
              </CardHeader>
              <CardBody>
               {props.itemName}
                <p>{props.price}</p>

                <StarRatingComponent
                    size={20}
                    value={0}
                    starRatedColor="blue"
                    starCount={5}
                    name='rating'
                    
                    />
              </CardBody>
            </Card>
          </Col>
    )

}

export default ItemsCard;