<!--
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
</div>-->

<div class="container">
    <div class="row">
        <div ng-class="vehicle.addingVehicle ? 'col-lg-8' : 'col-lg-12'">
            <h1>Vehicle Details</h1>
            <table class="table table-hover">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Brand</th>
                </tr>
                <tr ng-repeat="v in vehicle.data.vehicles">
                    <th>{{v.id}}</th>
                    <th>{{v.name}}</th>
                    <th>{{v.brand}}</th>
                </tr>
            </table>
        </div>
        <div ng-class="vehicle.addingVehicle ? 'col-lg-4' : 'col-lg-0'">
            <ui-view></ui-view>
        </div>
    </div>


    <div class="row ">
        <div class="col-md-4">
            <button ng-click="vehicle.addVehicle()" class="btn btn-primary">Add a Vehicle</button>
        </div>
    </div>
</div>