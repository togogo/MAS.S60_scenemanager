var mgr;
function setup()
{
  createCanvas(600, 500);
  mgr = new SceneManager();
  // Preload scenes. Preloading is normally optional
  // ... but needed if showNextScene() is used.
  mgr.addScene ( Animation1 );
  mgr.addScene ( Animation2 );
  mgr.addScene ( Animation3 );
  mgr.showNextScene();
}
function draw()
{
  mgr.draw();
}
function mousePressed()
{
  mgr.handleEvent("mousePressed");
}
function keyPressed()
{
  // You can optionaly handle the key press at global level...
  switch(key)
  {
  case '1':
    mgr.showScene( Animation1 );
    break;
  case '2':
    mgr.showScene( Animation2 );
    break;
  case '3':
    mgr.showScene( Animation3 );
    break;
  }

  // ... then dispatch via the SceneManager.
  mgr.handleEvent("keyPressed");
}
// =============================================================
// =                         BEGIN SCENES                      = 
// =============================================================
function Animation1()
{
  var textX;
  var textY;

  // enter() will be executed each time the SceneManager switches
  // to this animation
  // Note: Animation1() doesn't have setup() or draw()
  this.enter = function()
  {
    textX = 10;
    textY = 0;
    background("teal");
    textAlign(CENTER);
    fill("black");
    text("Press keys 1, 2, 3 to jump to a particular animation\n" + 
      "... or mouse to advance animation.\n\n" +
      "Press any other key to display it.", width / 2, height / 2);
  }
  this.keyPressed = function()
  {
    text(keyCode, textX, textY += 10);
    if ( textY > height )
    {
      textX += 20;
      textY = 0;
    }
  }
  this.mousePressed = function()
  {
    this.sceneManager.showNextScene();
  }
}
function Animation2()
{
  this.y = 0;

  this.draw = function()
  {
    background("teal");
    line(0, this.y, width, this.y);
    this.y++;
    if ( this.y > height )
      this.y = 0;
  }
  this.mousePressed = function()
  {
    this.sceneManager.showNextScene();
  }
}
// When defining scenes, you can also 
// put the setup, draw, etc. methods on prototype
function Animation3( )
{
  this.oAnim1 = null;
}
Animation3.prototype.setup = function()
{
  // access a different scene using the SceneManager
  oAnim1 = this.sceneManager.findScene( Animation2 );
}
Animation3.prototype.draw = function()
{
  background("lightblue");

  var r = sin( frameCount * 0.01 );

  fill("white");
  ellipse( width / 2, height / 2, map(r, 0, 1, 100, 200) );
  if ( oAnim1 != null )
  {
    fill("black");
    textAlign(LEFT);
    text( "Scene1 y: " + oAnim1.oScene.y, 10, height - 20);
  }
}
Animation3.prototype.mousePressed = function()
{
  this.sceneManager.showNextScene();
}
