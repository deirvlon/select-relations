# Select Relations JS

Select Relations JS is a lightweight JavaScript library designed to simplify the process of filtering options in HTML select elements based on the selected values of other related select elements.

## Features

- **Dynamic Filtering:** Automatically filters options in select elements based on the selected values of other related select elements.
- **Multi-Parent Support:** Supports scenarios where a select element's options depend on the selected values of multiple parent select elements.
- **Efficient Implementation:** Optimized code ensures efficient filtering and minimal impact on page performance.
- **Reset Functionality:** Provides built-in functionality to reset the selection of parent select elements if the selected option becomes hidden due to filtering.
- **Easy Integration:** Simple and intuitive API allows for easy integration into existing projects with minimal setup.


## Usage

```html
<div class="container">
  <select id="countrySelect" class="select-relations">
    <option value="USA">USA</option>
    <option value="Canada">Canada</option>
  </select>
  <select id="citySelect" class="select-relations" data-sf-parent="countrySelect">
    <option value="New York" data-pr="countrySelect:USA">New York</option>
    <option value="Los Angeles" data-pr="countrySelect:USA">Los Angeles</option>
    <option value="Toronto" data-pr="countrySelect:Canada">Toronto</option>
    <option value="Vancouver" data-pr="countrySelect:Canada">Vancouver</option>
  </select>
  <select id="regionSelect" class="select-relations" data-sf-parent="citySelect">
    <option value="Manhattan" data-pr="citySelect:New York">Manhattan</option>
    <option value="Brooklyn" data-pr="citySelect:New York">Brooklyn</option>
    <option value="Hollywood" data-pr="citySelect:Los Angeles">Hollywood</option>
    <option value="Downtown" data-pr="citySelect:Los Angeles,citySelect:Toronto">Downtown</option>
    <option value="North Vancouver" data-pr="citySelect:Vancouver">North Vancouver</option>
    <option value="West Vancouver" data-pr="citySelect:Vancouver">West Vancouver</option>
  </select>
</div>


<!-- Select Relations JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="select-relations.js"></script>
```

## License

Select Relations JS is released under the MIT License.
- Company: Deirvlon Technologies
- Author: Kamran Gasimov
- Website: https://deirvlon.com
