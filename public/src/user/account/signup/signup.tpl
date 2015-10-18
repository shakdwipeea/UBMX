<div class="mui-row">
      <div class="mui-col-md-6 mui-col-md-offset-3">
       <div class="mui-panel">


    <form ng-submit="signup.submit()" class="col s12">
        <div class="row">
            <div class="mui-textfield mui-textfield--float-label">
                <span class="ak-error-notify">{{signup.message}}</span>
                <input ng-model="signup.name"  id="name" type="text"
                       class="validate">
                <label for="name" data-error="wrong" data-success="right">Name</label>

            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input ng-model="signup.password" id="password" type="password" class="validate">
                <label for="password">Password</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input ng-model="signup.email" ng-change="signup.checkUserName()" id="email" type="email" class="validate">
                <label for="Email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input ng-model="signup.phone" id="phone" type="text" class="validate">
                <label for="password">Phone</label>
            </div>
            <div class=" col s12">
                <button ng-disabled="!signup.enable" class="mui-btn mui-btn--raised" type="submit" name="action">
                    Sign Up
                    <i class="material-icons">send</i>
                </button>
            </div>
        </div>
    </form>
    </div>
    </div>
</div>