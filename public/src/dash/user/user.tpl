<div class="container">
    <h1>User List</h1>
    <table class="table table-hover">
        <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>phone</th>
        </tr>
        <tr ng-repeat="user in user.users">
            <th>{{user.id}}</th>
            <th>{{user.name}}</th>
            <th>{{user.email}}</th>
            <th>{{user.phone}}</th>
        </tr>
    </table>
</div>