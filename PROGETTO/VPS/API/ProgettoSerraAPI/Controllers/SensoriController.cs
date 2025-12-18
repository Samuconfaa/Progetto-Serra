using Microsoft.AspNetCore.Mvc;
using ProgettoSerraAPI.Models;

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

            Console.WriteLine(
                $"Luce={dato.Luce}, Temp={dato.Temperatura}, Umid={dato.Umidita}, Time={dato.Timestamp}"
            );

            return Ok(new { status = "ok" });
        }
    }
}
