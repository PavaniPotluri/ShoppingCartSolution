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

namespace ShoppingCart.WebAPI.Controllers
{
    [Authorize]
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userRepository;

        public UsersController(IUserService repository)
        {
            _userRepository = repository;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Token")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            var user = _userRepository.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }


    }
}
