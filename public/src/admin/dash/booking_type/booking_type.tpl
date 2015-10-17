<div class="container">
    <div class="row">
        <div ng-class="bookingType.adding ? 'col-lg-8': 'col-lg-12'"><h1>Booking Type Details</h1>
            <table class="table table-hover">
                <tr>
                    <th>Id</th>
                    <th>Type</th>
                </tr>
                <tr ng-repeat="v in bookingType.data.booking_type">
                    <th>{{v.id}}</th>
                    <th>{{v.name}}</th>
                </tr>
            </table>
        </div>
        <div ng-class="bookingType.adding ? 'col-lg-4': 'col-lg-0'">
            <ui-view></ui-view>
        </div>
    </div>

    <div class="row">
        <button class="btn btn-primary" ng-click="bookingType.showAdd()">Add</button>
    </div>
</div>