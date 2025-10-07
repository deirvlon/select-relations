# Select Relations JS v2.0.0

A powerful, lightweight JavaScript library for creating dynamic form dependencies with advanced logical operations. Control the visibility and availability of select options based on complex conditions using AND, OR, and parenthesis grouping.

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/deirvlon/select-relations)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🚀 What's New in v2.0.0

- **OR Logic (`|`)**: Create conditions where any one of multiple criteria can be met
- **Parenthesis Grouping (`()`)**: Build complex nested conditions with proper precedence
- **Enhanced Expression Evaluation**: Smart parser handles complex logical expressions
- **Backward Compatible**: All existing v1.x implementations continue to work without modification

## ✨ Features

### Core Functionality
- **Dynamic Filtering**: Automatically shows/hides options based on parent element selections
- **Multi-Parent Support**: Options can depend on values from multiple parent elements
- **Logical Operators**: 
  - `&` (AND) - All conditions must be true
  - `|` (OR) - At least one condition must be true
  - `()` (Grouping) - Control evaluation order
- **Multiple Value Support**: Match against multiple values using comma-separated lists
- **Checkbox Support**: Include checkbox states in your conditional logic
- **Auto-Reset**: Automatically clears invalid selections when options become unavailable
- **Select2 Integration**: Built-in support for Select2 enhanced dropdowns
- **Zero Dependencies**: Works with vanilla JavaScript (jQuery only needed for Select2)
- **Lightweight**: Minimal footprint with optimized performance
- **Easy Integration**: Simple API with data attributes
## ✅ Examples
- **Examples**: [https://deirvlon.github.io/select-relations/select_relations_demo.html](https://deirvlon.github.io/select-relations/select_relations_demo.html)

## 📦 Installation

### CDN (Recommended)
```html
<!-- jQuery (required only if using Select2) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<!-- Select Relations JS -->
<script src="https://deirvlon.github.io/select-relations/select-relations.js"></script>
```


### Manual Download
Download `select-relations.js` and include it in your project:
```html
<script src="path/to/select-relations.js"></script>
```

## 🎯 Quick Start

### Basic Example
```html
<select id="country" class="select-relations">
  <option value="">Select Country</option>
  <option value="usa">USA</option>
  <option value="canada">Canada</option>
</select>

<select id="city" class="select-relations" data-sf-parent="country">
  <option value="">Select City</option>
  <option value="ny" data-pr="country:usa">New York</option>
  <option value="la" data-pr="country:usa">Los Angeles</option>
  <option value="toronto" data-pr="country:canada">Toronto</option>
  <option value="vancouver" data-pr="country:canada">Vancouver</option>
</select>
```

## 📖 Usage Guide

### Data Attributes

#### `class="select-relations"`
Add this class to any select element that participates in the relation system (both parent and child elements).

#### `data-sf-parent="parentId1,parentId2,..."`
Specify which select elements control this element. Use comma-separated IDs for multiple parents.

#### `data-pr="condition"`
Define the condition that must be met for this option to be available.

### Condition Syntax

#### Simple Condition
```html
<option data-pr="selectId:value">Option Text</option>
```

#### Multiple Values (OR within same select)
```html
<option data-pr="selectId:value1,value2,value3">Option Text</option>
```

#### AND Logic
All conditions must be true:
```html
<option data-pr="country:usa&state:california">Option Text</option>
```

#### OR Logic
At least one condition must be true:
```html
<option data-pr="country:usa|country:canada">Option Text</option>
```

#### Parenthesis Grouping
Control evaluation order:
```html
<option data-pr="(country:usa&state:ca)|(country:canada&province:on)">
  Option Text
</option>
```

#### Complex Mixed Logic
```html
<option data-pr="status:active&(priority:high|priority:urgent)">
  Option Text
</option>
```

## 💡 Real-World Examples

### Example 1: E-commerce Product Configuration
```html
<select id="product_type" class="select-relations">
  <option value="">Select Product Type</option>
  <option value="laptop">Laptop</option>
  <option value="desktop">Desktop</option>
  <option value="tablet">Tablet</option>
</select>

<select id="brand" class="select-relations" data-sf-parent="product_type">
  <option value="">Select Brand</option>
  <option value="apple" data-pr="product_type:laptop|product_type:tablet">Apple</option>
  <option value="dell" data-pr="product_type:laptop|product_type:desktop">Dell</option>
  <option value="hp" data-pr="product_type:laptop|product_type:desktop">HP</option>
  <option value="samsung" data-pr="product_type:tablet">Samsung</option>
</select>

<select id="specs" data-sf-parent="product_type,brand">
  <option value="">Select Specification</option>
  <option value="m1" data-pr="product_type:laptop&brand:apple">MacBook M1</option>
  <option value="m2" data-pr="product_type:laptop&brand:apple">MacBook M2</option>
  <option value="xps13" data-pr="product_type:laptop&brand:dell">XPS 13</option>
  <option value="ipad" data-pr="product_type:tablet&brand:apple">iPad Pro</option>
</select>
```

### Example 2: Shipping Options with Premium Override
```html
<select id="country" class="select-relations">
  <option value="">Select Country</option>
  <option value="usa">USA</option>
  <option value="canada">Canada</option>
  <option value="international">International</option>
</select>

<label>
  <input type="checkbox" id="premium_member" class="select-relations">
  Premium Member
</label>

<select id="shipping" data-sf-parent="country,premium_member">
  <option value="">Select Shipping</option>
  <option value="standard" data-pr="country:usa|country:canada">
    Standard Shipping
  </option>
  <option value="express" data-pr="(country:usa|country:canada)&premium_member:1">
    Express Shipping (Premium Members)
  </option>
  <option value="overnight" data-pr="country:usa&premium_member:1">
    Overnight (US Premium Only)
  </option>
  <option value="international" data-pr="country:international|premium_member:1">
    International (All Countries for Premium)
  </option>
</select>
```

### Example 3: Multi-Level Cascading Selects
```html
<select id="region" class="select-relations">
  <option value="">Select Region</option>
  <option value="north_america">North America</option>
  <option value="europe">Europe</option>
</select>

<select id="country" class="select-relations" data-sf-parent="region">
  <option value="">Select Country</option>
  <option value="usa" data-pr="region:north_america">USA</option>
  <option value="canada" data-pr="region:north_america">Canada</option>
  <option value="uk" data-pr="region:europe">United Kingdom</option>
  <option value="germany" data-pr="region:europe">Germany</option>
</select>

<select id="state" class="select-relations" data-sf-parent="country">
  <option value="">Select State/Province</option>
  <option value="ca" data-pr="country:usa">California</option>
  <option value="ny" data-pr="country:usa">New York</option>
  <option value="on" data-pr="country:canada">Ontario</option>
  <option value="bc" data-pr="country:canada">British Columbia</option>
</select>

<select id="city" class="select-relations" data-sf-parent="state">
  <option value="">Select City</option>
  <option value="la" data-pr="state:ca">Los Angeles</option>
  <option value="sf" data-pr="state:ca">San Francisco</option>
  <option value="nyc" data-pr="state:ny">New York City</option>
  <option value="buffalo" data-pr="state:ny">Buffalo</option>
  <option value="toronto" data-pr="state:on">Toronto</option>
  <option value="vancouver" data-pr="state:bc">Vancouver</option>
</select>
```

### Example 4: Using Alternative Values with `data-alt`
```html
<select id="category" class="select-relations">
  <option value="1" data-alt="electronics">Electronics</option>
  <option value="2" data-alt="clothing">Clothing</option>
</select>

<select id="product" data-sf-parent="category">
  <!-- Match by value -->
  <option data-pr="category:1">Laptop</option>
  <!-- Match by data-alt -->
  <option data-pr="category:electronics">Phone</option>
</select>
```

## 🔧 Advanced Configuration

### Manual Initialization
If you're dynamically adding elements after page load:
```javascript
// Manually trigger re-initialization
window.updateSelectRelations();
```

### With Select2
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
<script>
$(document).ready(function() {
  $('.select-relations').select2({
    placeholder: "Select an option",
    allowClear: true
  });
});
</script>
```

### Non-Select Elements
You can also use relations on other form elements:
```html
<input type="checkbox" id="agree" class="select-relations">

<div id="terms_content" data-sf-parent="agree" data-pr="agree:1">
  <!-- This div will show/hide based on checkbox -->
  Terms and conditions content...
</div>
```

## 🎨 Operator Precedence

The library follows standard logical operator precedence:

1. **Parentheses** `()` - Highest priority (evaluated first)
2. **AND** `&` - Medium priority
3. **OR** `|` - Lowest priority

### Examples:
```
A&B|C        → (A AND B) OR C
A|B&C        → A OR (B AND C)
(A|B)&C      → (A OR B) AND C
A&(B|C)      → A AND (B OR C)
(A&B)|(C&D)  → (A AND B) OR (C AND D)
```

## 🔍 Debugging

Enable console logging to see what's happening:
```javascript
// Add this before loading select-relations.js
window.SELECT_RELATIONS_DEBUG = true;
```

## ⚡ Performance Tips

1. **Minimize DOM Queries**: Use IDs for parent selects for faster lookups
2. **Simplify Conditions**: Break complex conditions into multiple steps when possible
3. **Limit Depth**: Avoid deeply nested cascading selects (>5 levels)
4. **Batch Updates**: When programmatically updating multiple selects, use `window.updateSelectRelations()` once at the end

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11 (with polyfills)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Migration from v1.x

Version 2.0.0 is **fully backward compatible** with v1.x. All existing code will continue to work without modification.

To use the new features, simply update your `data-pr` attributes:

**Before (v1.x):**
```html
<option data-pr="country:usa&state:ca">California Option</option>
```

**After (v2.0.0) - Same syntax works, plus new options:**
```html
<!-- OR Logic -->
<option data-pr="country:usa|country:canada">North America Option</option>

<!-- Grouping -->
<option data-pr="(country:usa&state:ca)|(country:canada&province:on)">
  Complex Option
</option>
```

## 📄 License

Select Relations JS is released under the MIT License. See [LICENSE](LICENSE) file for details.

## 👨‍💻 Author & Credits

**Author**: Kamran Gasimov  
**Company**: Deirvlon Technologies  
**Website**: [https://deirvlon.com](https://deirvlon.com)  
**Created**: April 9, 2024  
**Last Updated**: October 8, 2025

© All rights are reserved Deirvlon Technologies.

## 🆘 Support
- **Examples**: [https://deirvlon.github.io/select-relations/select_relations_demo.html](https://deirvlon.github.io/select-relations/select_relations_demo.html)
- **Documentation**: [https://deirvlon.github.io/select-relations](https://deirvlon.github.io/select-relations)
- **Issues**: [GitHub Issues](https://github.com/deirvlon/select-relations/issues)
- **Email**: support@deirvlon.com

## ⭐ Show Your Support

If you find this library helpful, please consider giving it a star on GitHub!

---

Made with ❤️ by [Deirvlon Technologies](https://deirvlon.com)
