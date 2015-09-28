<div class="intro">
    <div class="row">
        <div class="col-lg-2">
            <nav class="nav" role="navigation">
                <ul class="nav nav-pills nav-stacked">
                    <li role="presentation" ng-class="{ 'active': select == 'dashboard' }"
                        ng-click="select = 'dashboard'"><a
                            ui-sref="dash.infoBoard">Dashboard</a></li>
                    <li role="presentation" ng-class="{ 'active': select == 'user' }" ng-click="select = 'user'"><a
                            ui-sref="dash.user">User Management</a> </a></li>
                    <li role="presentation" ng-class="{ 'active': select == 'vendor' }" ng-click="select = 'vendor'"><a
                            ui-sref="dash.vendor">Vendor Management</a></li>
                    <li role="presentation" ng-class="{ 'active': select == 'vehicle' }" ng-click="select = 'vehicle'">
                        <a
                                ui-sref="dash.vehicle">Vehicle Management</a></li>
                    <li role="presentation" ng-class="{ 'active': select == 'problem' }" ng-click="select = 'problem'">
                        <a
                                ui-sref="dash.problem">Problem Management</a></li>
                    <li role="presentation" ng-class="{ 'active': select == 'booking_type' }"
                        ng-click="select = 'booking_type'"><a
                            ui-sref="dash.booking_type">Booking Type Management</a></li>
                    <li role="presentation" ng-class="{ 'active': select == 'booking' }" ng-click="select = 'booking'">
                        <a
                                ui-sref="dash.booking">Booking Management</a></li>


                </ul>
            </nav>
        </div>

        <div class="col-lg-10">
            <div class="row">
                <div ui-view></div>
            </div>
        </div>
    </div>
</div>
