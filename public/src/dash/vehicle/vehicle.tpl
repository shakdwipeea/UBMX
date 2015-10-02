<div class="container">
    <h1 class="h1">Vehicle Details</h1>
    <table class="table table-hover">
        <tr>
            <th>ID</th>
            <th>name</th>
            <th>Brand</th>
        </tr>
        <tr ng-repeat="vehicle in vehicle.vehicles">
            <th>{{vehicle.id}}</th>
            <th>{{vehicle.name}}</th>
            <th>{{vehicle.brand}}</th>
        </tr>
    </table>
</div>