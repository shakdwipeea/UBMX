<div class="container">
    <table class="table table-hover">
        <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Vendor</th>
            <th>User name</th>
            <th>status</th>
            <th>problem</th>
            <th>slot</th>
            <th>feedback</th>
            <th>rating</th>
        </tr>
        <tr ng-repeat="booking in booking.bookings">
            <th>{{booking.id}}</th>
            <th>{{booking.type}}</th>
            <th>{{booking.vendor}}</th>
            <th>{{booking.user}}</th>
            <th>{{booking.status}}</th>
            <th>{{booking.problem}}</th>
            <th>{{booking.slot}}</th>
            <th>{{booking.feedback}}</th>
            <th>{{booking.rating}}</th>
        </tr>
    </table>
</div>