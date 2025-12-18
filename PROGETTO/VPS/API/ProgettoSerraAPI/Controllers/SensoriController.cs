using Microsoft.AspNetCore.Mvc;
using ProgettoSerraAPI.Models;
using ProgettoSerraAPI.Services;

namespace ProgettoSerraAPI.Controllers
{
    [ApiController]
    [Route("")]
    public class SensoriController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] SensoreDto dato)
        {
            if (dato == null)
                return BadRequest();

            dato.Timestamp = DateTime.UtcNow;

            SensoriStore.Dati.Add(dato);

            if (SensoriStore.Dati.Count > 300)
                SensoriStore.Dati.RemoveAt(0);

            return Ok(new { status = "ok" });
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(SensoriStore.Dati);
        }
    }
}
