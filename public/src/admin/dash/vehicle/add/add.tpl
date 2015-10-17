<div>
    <form>
        <div class="input-group">
            <input type="text" class="input-control" placeholder="Name of vehicle" ng-model="addVehicle.vehicle.name"/>
        </div>

        <div class="input-group">
            <input type="text" class="input-control" placeholder="Brand of vehicle"
                   ng-model="addVehicle.vehicle.brand"/>
        </div>

        <div class="input-group">
            <button type="submit" ng-click="addVehicle.add()" class="btn btn-default">Submit</button>
        </div>
    </form>
</div>