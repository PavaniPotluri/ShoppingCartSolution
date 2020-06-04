using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingCart.WebAPI.Helpers;
using ShoppingCart.WebAPI.Models;
using ShoppingCart.WebAPI.Services;

namespace ShoppingCart.WebAPI.Controllers
{
    [Authorize]
    [Route("api/Items")]
    [EnableCors("AllowOrigin")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemsService _itemRepository;

        public ItemsController(IItemsService repository)
        {
            _itemRepository = repository;
        }

        [HttpGet]
        [Route("GetItems")]
        public ICollection<ItemsModel> GetItems()
        {
            return _itemRepository.GetItems();
        }

        [HttpGet]
        [Route("GetSingle/{id}")]
        public ItemsModel GetSingle(int id)
        {
            return _itemRepository.GetSingle(id);
        }

        [HttpPost]
        [Route("AddItem")]
        public IActionResult AddItem(ItemsModel model)
        {
            int status = _itemRepository.AddItem(model);
            if (status > 0)
            {
                return Ok(model);
            }
            else if (status == -1)
            {
                return Conflict(new { message = "Item name already exists." });
            }
            else
            {
                return BadRequest(new { message = "Item not added to cart. Please try again!" });
            }
        }


        [HttpPut]
        [Route("UpdateItem/{id}")]
        public IActionResult UpdateItem(ItemsModel model, int id)
        {
            int status = _itemRepository.UpdateItem(model, id);
            if (status > 0)
            {
                return Ok(model);
            }
            else if(status == -1)
            {
                return Conflict(new { message = "Item name already exists." });
            }
            else
            {
                return BadRequest(new { message = "Item imformation not modified. Please try again!" });
            }
        }

        [HttpDelete]
        [Route("DeleteItem/{id}")]
        public IActionResult DeleteItem(int id)
        {
            int status = _itemRepository.DeleteItem(id);
            if (status > 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "Item not deleted from cart. Please try again!" });
            }
        }

        [HttpGet]
        [Route("GetCategories")]
        public ICollection<ItemCategoriesModel> GetCategories()
        {
            return _itemRepository.GetCategories();
        }
    }
}
