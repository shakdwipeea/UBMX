<div class="container">
  <ul class="collection with-header">
    <li class="collection-header"> Vehicle List </li>
    <li class="collection-item" ng-repeat="result in dash.results">
      {{result.brand}} <div class="secondary-content"> {{result.name}} </div>
    </li>
  </ul>
</div>
