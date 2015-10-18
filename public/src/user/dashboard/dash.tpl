<!-- <div class="container">
  <ul class="collection with-header">
    <li class="collection-header"> Vehicle List </li>
    <li class="collection-item" ng-repeat="result in dash.results">
      {{result.brand}} <div class="secondary-content"> {{result.name}} </div>
    </li>
  </ul>
</div>
 -->
 <!-- User dashboard coming up 
 Sam[le template above -->
  <div>
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