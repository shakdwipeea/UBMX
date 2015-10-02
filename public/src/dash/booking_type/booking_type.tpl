<div class="container">
    <h1>Booking Type Details</h1>
    <table class="table table-hover">
        <tr>
            <th>Id</th>
            <th>Type</th>
        </tr>
        <tr ng-repeat="v in bookingType.booking_type">
            <th>{{v.id}}</th>
            <th>{{v.name}}</th>
        </tr>
    </table>
</div>