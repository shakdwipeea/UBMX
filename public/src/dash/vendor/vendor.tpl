<div class="container">
    <h1>Vendor Details</h1>
    <table class="table table-hover">
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Timings</th>
            <th>Capacity</th>
        </tr>
        <tr ng-repeat="v in vendor.vendors">
            <th>{{v.id}}</th>
            <th>{{v.name}}</th>
            <th>{{v.email}}</th>
            <th>{{v.timings}}</th>
            <th>{{v.capacity_per_slot}}</th>
        </tr>
    </table>
</div>