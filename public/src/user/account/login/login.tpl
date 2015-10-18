 <div class="mui-row">
  <div class="mui-col-md-6 mui-col-md-offset-3">
 <div class="mui-panel">
    <form ng-submit="login.submit()" class="col s12">
      <div class="row">
        <div class="mui-textfield mui-textfield--float-label">
          <input data-ng-model="login.email" id="email" type="email" class="validate">
          <label for="email" data-error="wrong" data-success="right">Email</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
          <input data-ng-model="login.password" id="password" type="password" class="validate">
          <label for="password" >Password</label>
        </div>
        <div class=" col s12">
          <button class="mui-btn mui-btn--raised" type="submit" name="action">Log In
            <i class="material-icons">send</i>
         </button>
        </div>
      </div>
      <div data-ng-bind="login.Message">

      </div>
    </form>

  </div>
  </div>
  </div>