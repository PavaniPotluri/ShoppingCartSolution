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
    [Route("api/Dashboard")]
    [ApiController]
    public class DashboardController: ControllerBase
    {
        private readonly IDashboardService _dashboardRepository;

        public DashboardController(IDashboardService repository)
        {
            _dashboardRepository = repository;
        }

        [HttpGet]
        [Route("GetDashboardItems")]
        public DashboardModel GetDashboardItems()
        {
            int userId = APIUserHelper.GetUserId(User);
            return _dashboardRepository.GetDashboardItems(userId);
        }
    }
}
