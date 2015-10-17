<div class="container">
    <div class="row">
        <div ng-class="vendor.addingVendor ? 'col-lg-8' : 'col-lg-12'">
            <h1>Vendor Details</h1>
            <table class="table table-hover">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Timings</th>
                    <th>Capacity</th>
                </tr>
                <tr ng-repeat="v in vendor.data.vendors">
                    <th>{{v.id}}</th>
                    <th>{{v.name}}</th>
                    <th>{{v.email}}</th>
                    <th>{{v.timings}}</th>
                    <th>{{v.capacity_per_slot}}</th>
                </tr>
            </table>
        </div>
        <div ng-class="vendor.addingVendor ? 'col-lg-4' : 'col-lg-0'">
            <ui-view></ui-view>
        </div>
    </div>


    <div class="row ">
        <div class="col-md-4">
            <button ng-click="vendor.addVendor()" class="btn btn-primary">Add a Vendor</button>
        </div>
    </div>
</div>