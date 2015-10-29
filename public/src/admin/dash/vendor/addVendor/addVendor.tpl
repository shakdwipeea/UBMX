<div>
    <form>
        <div class="form-group">
            <input placeholder="Name of vendor" class="form-control" id="username" required name="username"
                   ng-model="addVendor.vendor.username">
        </div>
        <div class="form-group">
            <input placeholder="Email " class="form-control" id="email" required name="email"
                   ng-model="addVendor.vendor.email">
        </div>
        <div class="form-group">
            <input placeholder="Timings " class="form-control" id="timings" required name="timings"
                   ng-model="addVendor.vendor.timings">
        </div>
        <div class="form-group">
            <input placeholder="capacity_per_slot " class="form-control" id="capacity_per_slot" required
                   name="capacity_per_slot"
                   ng-model="addVendor.vendor.capacity_per_slot">
        </div>

        <div class="form-group">
            <input placeholder="Location(in words) " class="form-control" id="location" required
                   name="location"
                   ng-model="addVendor.vendor.location">
        </div>


        <div class="form-group">
            <input placeholder="latitude " class="form-control" id="lat" required
                   name="lat"
                   ng-model="addVendor.vendor.lat">
        </div>

        <div class="form-group">
            <input placeholder="longitude " class="form-control" id="lng" required
                   name="lng"
                   ng-model="addVendor.vendor.lng">
        </div>

        <div class="form-group">
            <input type="password" placeholder="password " class="form-control" id="password" required name="password"
                   ng-model="addVendor.vendor.password">
        </div>

        <div class="form-group">
            <div class="form-control" ng-repeat="problem in addVendor.data.problems">
                <label><input type="checkbox" value="problem.id" ng-model="addVendor.vendor.problems[problem.id]"/>{{problem.name}}</label>
            </div>
        </div>

        <div class="form-group">
            <div class="form-control" ng-repeat="b_type in addVendor.data.booking_type">
                <label><input type="checkbox" value="b_type.id" ng-model="addVendor.vendor.booking_type[b_type.id]"/>{{b_type.name}}</label>
            </div>
        </div>

        <div class="form-group">
            <button type="submit" class="btn btn-default" ng-click="addVendor.add()">
                Add This Vendor
            </button>
        </div>

    </form>
</div>