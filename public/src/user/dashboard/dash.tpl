  <div  ng-if="account.loggedin">
    <a href="#/booking"><button class="mui-btn mui-btn--raised">Book Now!</button></a>
 <div id="flip-scroll">

    <table class="mui-table" style="margin:15px;">
        <thead>
            <tr>
                <th>Type</th>
                <th>Vendor</th>
                <th>Problem</th>
                <th>Date</th>
                <th>Status</th>
                <th>Ratings</th>
            </tr>
        </thead>
        <tbody id="bookings" ng-repeat = "result in dash.results" >
            <tr>
                <td>{{result.type}}</td>
                <td>{{result.vendor}}</td>
                <td>{{result.problem}}</td>
                <td>{{result.slot}}</td>
                <td>{{result.status}}</td>
                <td>{{result.rating}}</td>
            </tr>
        </tbody>
    </table>
</div>
</div>
<div  ng-if="!account.loggedin">
    {{account.loggedin}}
 <a href="#/customer"><button class="mui-btn mui-btn--raised">Please Login To Continue!!!</button></a>
</div>