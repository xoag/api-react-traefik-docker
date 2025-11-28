using Microsoft.AspNetCore.Mvc;
using ApiDemo.Models;

namespace ApiDemo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static List<Product> _products = new()
    {
        new Product { Id = 1, Name = "Laptop", Description = "High-performance laptop", Price = 1299.99m, CreatedAt = DateTime.UtcNow.AddDays(-10) },
        new Product { Id = 2, Name = "Mouse", Description = "Wireless mouse", Price = 29.99m, CreatedAt = DateTime.UtcNow.AddDays(-5) },
        new Product { Id = 3, Name = "Keyboard", Description = "Mechanical keyboard", Price = 89.99m, CreatedAt = DateTime.UtcNow.AddDays(-3) },
        new Product { Id = 4, Name = "Monitor", Description = "4K Monitor 27 inch", Price = 399.99m, CreatedAt = DateTime.UtcNow.AddDays(-1) }
    };

    private readonly ILogger<ProductsController> _logger;

    public ProductsController(ILogger<ProductsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetAll()
    {
        _logger.LogInformation("Getting all products");
        return Ok(_products);
    }

    [HttpGet("{id}")]
    public ActionResult<Product> GetById(int id)
    {
        _logger.LogInformation($"Getting product with id {id}");
        var product = _products.FirstOrDefault(p => p.Id == id);
        
        if (product == null)
        {
            return NotFound();
        }

        return Ok(product);
    }

    [HttpPost]
    public ActionResult<Product> Create([FromBody] Product product)
    {
        _logger.LogInformation("Creating new product");
        product.Id = _products.Max(p => p.Id) + 1;
        product.CreatedAt = DateTime.UtcNow;
        _products.Add(product);
        
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public ActionResult<Product> Update(int id, [FromBody] Product product)
    {
        _logger.LogInformation($"Updating product with id {id}");
        var existingProduct = _products.FirstOrDefault(p => p.Id == id);
        
        if (existingProduct == null)
        {
            return NotFound();
        }

        existingProduct.Name = product.Name;
        existingProduct.Description = product.Description;
        existingProduct.Price = product.Price;

        return Ok(existingProduct);
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        _logger.LogInformation($"Deleting product with id {id}");
        var product = _products.FirstOrDefault(p => p.Id == id);
        
        if (product == null)
        {
            return NotFound();
        }

        _products.Remove(product);
        return NoContent();
    }
}
