$(document).ready(function(){
    $('#searchuser').on('keyup',function(e){
        
        let username=e.target.value;
        
        //request to github
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id:'your client id',
                client_secret:'you clinet_secret id'
            }
        }).done(function(user){
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                 data:{
                client_id:'75b93edb9d0893617a88',
                client_secret:'6345e2c823163038e0a8a5e5983cbff6f614a0a8',
                     sort:'created: asc',
                     per_page: 5
            }
            
            }).done(function(repos){
                   $.each(repos,function(index,repo){
                       $('#repos').append(`
                        <div class="well">
<div class="row">
    <div class="col-md-7">
        <strong class="texttransform">
        ${repo.name}
        </strong>
        <div class="repodesc">
        ${repo.description}
        </div >
    </div>
    <div class="col-md-3">
        <span  class="label label-default repos ">Forks: ${repo.forks_count}</span> 
        <span  class="label label-primary repos">Watchers: ${repo.watchers_counr}</span>
        <span  class="label label-success repos">Stars: ${repo.stargazers_count}</span>

    </div>

    <div  class="col-md-2 repobtn">
     <a target="_blank" href="${repo.html_url}" class="btn btn-info btn-block">Go to Repo</a>
    </div>
</div>
</div>
                        `);
                   });
        });
            $('#profile').html(`
    <div class="panel ">
      <div class="panel-heading panelprofile ">
        <h3 style= "font-weight:600;" class="panel-title ">${user.name}</h3>
      </div>
      <div class="panel-body">
        <div class="row">
  <div class="col-md-3">
<img class="thumbnail img-responsive avatar" src="${user.avatar_url}">
<a  target="_blank" class="btn btn-info btn-block profilebtn" href ="${user.html_url}">View Profile</a>
</div>
<div class="col-md-9">
<span class="label label-default">Public Repos: ${user.public_repos}</span>
<span class="label label-primary">Public Gists: ${user.gists}</span>
<span class="label label-success">Followers: ${user.followers}</span>
<span class="label label-info">Following: ${user.following}</span>
<br><br>
<ul class="list-group">
<li class="list-group-item"> Company: ${user.company}</li>
<li class="list-group-item"> Website/Blog: ${user.blog}</li>
<li class="list-group-item"> Location: ${user.location}</li>
<li class="list-group-item"> Member Since: ${user.created_at}</li>
</ul>
</div>
</div>
      </div>
    </div>
<h3 class="Page-header">Latest Repos<h3>
<div id ="repos"></div>

            `);
        });
    });

});
