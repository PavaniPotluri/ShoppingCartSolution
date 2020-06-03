using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingCart.WebAPI.Models;
using ShoppingCart.WebAPI.Services;
using ShoppingCart.WebAPI.Helpers;

namespace ShoppingCart.WebAPI.Controllers
{
    [Authorize]
    [Route("api/UserCart")]
    [ApiController]
    public class UserCartController : ControllerBase
    {
        private readonly ICartService _cartRepository;

        public UserCartController(ICartService repository)
        {
            _cartRepository = repository;
        }
        [HttpGet]
        [Route("GetAll")]
        public IEnumerable<CartModel> GetUserCartItems()
        {
            int userId = APIUserHelper.GetUserId(User);
            return _cartRepository.GetUserCartItems(userId);
        }

        [HttpGet]
        [Route("GetSingle/{id}")]
        public CartModel GetSingle(int id)
        {
            return _cartRepository.GetSingle(id);
        }

        [HttpPost]
        [Route("AddToCart")]
        public IActionResult AddKid(CartModel model)
        {
            int userId = APIUserHelper.GetUserId(User);
            model.UserId = userId;
            int status = _cartRepository.AddToCart(model);
            if (status > 0)
            {
                return Ok(model);
            }
            else
            {
                return BadRequest(new { message = "Item not added to cart. Please try again!" });
            }
        }

        [HttpPut]
        [Route("ModifyCartItem/{id}")]
        public IActionResult ModifyCartItem(CartModel model, int id)
        {
            int userId = APIUserHelper.GetUserId(User);
            model.UserId = userId;
            int status = _cartRepository.ModifyCartItem(model, id);
            if (status > 0)
            {
                return Ok(model);
            }
            else
            {
                return BadRequest(new { message = "Item imformation not modified. Please try again!" });
            }
        }

        [HttpDelete]
        [Route("DeleteCartItem/{id}")]
        public IActionResult DeleteCartItem(int id)
        {
            int status = _cartRepository.DeleteCartItem(id);
            if (status > 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "Item not deleted from cart. Please try again!" });
            }
        }

    }
}
