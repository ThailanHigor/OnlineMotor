using Data.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace Admin.Controllers
{
    [Authorize]
    public class AutorizadasController : Controller
    {
        private readonly IAuthorized _authorizedRepository;
        private readonly UserManager<IdentityUser> _userManager;
        public AutorizadasController(IAuthorized authorized, UserManager<IdentityUser> userManager)
        {
            _authorizedRepository = authorized;
            _userManager = userManager;
        }

        public IActionResult Index()
        {
            var userId = _userManager.GetUserId(HttpContext.User);
            var auths = _authorizedRepository.GetAll().Where(x => x.UserId == userId);
            return View(auths);
        }

        public IActionResult Delete(int Id)
        {
            var authorized = _authorizedRepository.GetById(Id);
            if(authorized != null)
                _authorizedRepository.Remove(authorized);

            return RedirectToAction("Index");
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Authorized authorized)
        {
            
            if (ModelState.IsValid)
            {
                authorized.UserId = _userManager.GetUserId(HttpContext.User);
                _authorizedRepository.Add(authorized);
                return RedirectToAction("Index");
            }

            return View(authorized);
        }

        public IActionResult Edit(int Id)
        {
            var authorized = _authorizedRepository.GetById(Id);
            return View(authorized);
        }

        [HttpPost]
        public IActionResult Edit(Authorized authorized)
        {
            if (ModelState.IsValid)
            {
                _authorizedRepository.Update(authorized);
                return RedirectToAction("Index");
            }

            return View(authorized);
        }
    }
}
