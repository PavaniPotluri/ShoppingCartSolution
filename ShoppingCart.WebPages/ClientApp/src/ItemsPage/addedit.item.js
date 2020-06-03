import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { itemActions } from '../_actions'
import { history } from '../_helpers';

class AddEditItemPage extends React.Component {

    constructor(props) {
        super(props);
        debugger;
        const itemId = this.props.match.params.id;

        this.state = {
            submitted: false,
            itemId: itemId,
            itemCategoryId: 0,
            description: '',
            price: 0,
            displayOrder: '',
            isInOffer: false,
            offerValidFrom: '',
            offerValidTo: false,
            offerPrice: 0,
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        const { dispatch } = this.props;
        if (this.state.itemId != 0) {

            dispatch(itemActions.getSingle(this.state.itemId));
        }
        dispatch(itemActions.getCategories());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            if (nextProps.itemData && nextProps.itemData.itemDetails) {
                let itemDetails = nextProps.itemData.itemDetails;
                this.setState({
                    submitted: false,
                    itemId: itemDetails.itemId,
                    itemCategoryId: itemDetails.itemCategoryId,
                    description: itemDetails.description,
                    price: itemDetails.price,
                    displayOrder: itemDetails.displayOrder,
                    isInOffer: itemDetails.isInOffer,
                    offerValidFrom: itemDetails.offerValidFrom,
                    offerValidTo: itemDetails.offerValidTo,
                    offerPrice: itemDetails.offerPrice,
                    loading: false
                });
            }
        }


    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    cancel() {
        history.push('/items');
    }

    handleSubmit(e) {
        e.preventDefault();
        const { itemId, itemCategoryId, description, price, displayOrder, isInOffer, offerValidFrom, offerValidTo, offerPrice } = this.state;
        const { dispatch } = this.props;
        let user = JSON.parse(localStorage.getItem('user'));
        let isValid = true;
        if (this.state.isInOffer && this.state.offerPrice > this.state.price)
            isValid = false;

        if (isValid) {
            this.setState({ submitted: true });

            if (itemCategoryId && description && price) {
                this.setState({ loading: true });
                const itemModel = {
                    itemId: parseInt(this.state.itemId),
                    itemCategoryId: parseInt(this.state.itemCategoryId),
                    description: this.state.description,
                    price: parseFloat(this.state.price),
                    displayOrder: parseInt(this.state.displayOrder),
                    isInOffer: (this.state.isInOffer ? this.state.isInOffer : false),
                    offerValidFrom: null,
                    offerValidTo: null,
                    offerPrice: this.state.offerPrice ? parseFloat(this.state.offerPrice) : null
                }
                if (this.state.itemId == 0)
                    dispatch(itemActions.addItem(itemModel));
                else
                    dispatch(itemActions.updateItem(itemModel, this.state.itemId));
            }
        }
    }



    render() {
        const style = { color: "#a94442", fontSize: "12px" };
        let pageTitle;
        let actionStatus;

        const { itemCategoryData, itemData } = this.props;

        if (this.state.itemId != 0) {
            pageTitle = <h2>Edit Item</h2>
            actionStatus = <b>Update</b>
        } else {
            pageTitle = <h2>Add Item</h2>
            actionStatus = <b>Save</b>
        }
        let { submitted, loading, itemId, itemCategoryId, description, price, displayOrder, isInOffer, offerValidFrom, offerValidTo, offerPrice } = this.state;

        return (
            <div>
                {itemCategoryData.loading && <em>Loading...</em>}
                {itemCategoryData.error && <span className="text-danger">ERROR: {itemCategoryData.error}</span>}
                {pageTitle}
                {itemCategoryData.categoryData &&
                    <Form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group col-sm-6' + (submitted && !description ? ' has-error' : '')}>
                            <label htmlFor="description">Item Name</label>
                            <input type="text" className="form-control" name="description" value={description} onChange={this.handleChange} />
                            {submitted && !description &&
                                <div className="help-block" style={{ fontSize: "12px" }}>Item Name required</div>
                            }
                        </div>
                        <div className="form-group col-sm-6">
                            <label htmlFor="itemCategoryId">Category</label>
                            <Input type="select" name="itemCategoryId"
                                value={itemCategoryId} onChange={this.handleChange}
                                className={'form-group' + (submitted && itemCategoryId == 0 ? ' has-error' : '')} >
                                <option value="">Select</option>
                                {itemCategoryData.categoryData && itemCategoryData.categoryData.map((item) =>
                                    <option key={item.itemCategoryId} value={item.itemCategoryId}>{item.categoryName}</option>
                                )}
                            </Input>
                            {submitted && !itemCategoryId &&
                                <div className="help-block" style={style}>Please select category</div>
                            }

                        </div>
                        <div className={'form-group col-sm-3' + (submitted && !price ? ' has-error' : '')}>
                            <label htmlFor="price">Price</label>
                            <input type="number" className="form-control" name="price" value={price} onChange={this.handleChange}></input>
                            {submitted && !price &&
                                <div className="help-block" style={{ fontSize: "12px" }}>Price required</div>
                            }
                        </div>
                        <div className={'form-group col-sm-3' + (submitted && !displayOrder ? ' has-error' : '')}>
                            <label htmlFor="displayOrder">Display Order</label>
                            <input type="number" pattern="[0-9]*" className="form-control"
                                name="displayOrder" value={displayOrder} onChange={this.handleChange}></input>
                            {submitted && !displayOrder &&
                                <div className="help-block" style={{ fontSize: "12px" }}>Display Order required</div>
                            }
                        </div>
                        <div className="form-group col-sm-6">
                            <FormGroup check className="checkbox">
                                <Input className="form-check-input" type="checkbox" id="isInOffer"
                                    name="isInOffer" checked={isInOffer} value={isInOffer}
                                    onChange={(e) => { this.setState({ isInOffer: !this.state.isInOffer }) }} checked={this.state.isInOffer} />
                                <Label check className="form-check-label" htmlFor="isInOffer">Offer Item</Label>
                            </FormGroup>
                        </div>
                        {isInOffer &&
                            <div className={'form-group col-sm-3' + (submitted && isInOffer && !offerPrice ? ' has-error' : '')}>
                                <label htmlFor="price">Offer Price</label>
                                <input type="number" className="form-control" name="offerPrice"
                                    value={offerPrice} onChange={this.handleChange}></input>
                                {submitted && isInOffer && !offerPrice &&
                                    <div className="help-block" style={{ fontSize: "12px" }}>Price required</div>
                                }
                                {parseInt(this.state.offerPrice) > parseInt(this.state.price) &&
                                    <div className="help-block" style={style}>Offer price should not be grater than Price</div>
                                }
                            </div>
                        }

                        <div className="form-group col-sm-6">
                        <button className="btn btn-primary" style={{marginRight:"10px"}}>{actionStatus}</button>
                            <button className="btn btn-danger" onClick={this.cancel}>Cancel</button>
                        </div>
                    </Form>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {

    const { itemCategoryData, itemData } = state;
    return {
        itemCategoryData,
        itemData
    };
}

const connectedAddEditItemPage = connect(mapStateToProps)(AddEditItemPage);
export { connectedAddEditItemPage as AddEditItemPage }; 