require 'test_helper'

class MainControllerTest < ActionDispatch::IntegrationTest
  test "should get generalPage" do
    get main_generalPage_url
    assert_response :success
  end

  test "should get friendsPage" do
    get main_friendsPage_url
    assert_response :success
  end

  test "should get reportPage" do
    get main_reportPage_url
    assert_response :success
  end

  test "should get followersPage" do
    get main_followersPage_url
    assert_response :success
  end

end
