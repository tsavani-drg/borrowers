require 'test_helper'

class FriendsControllerTest < ActionController::TestCase
  setup do
    @friend = friends(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:friends)
  end

  test "should create friend" do
    assert_difference('Friend.count') do
      post :create, friend: { email: @friend.email, first_name: @friend.first_name, last_name: @friend.last_name, total_articles: @friend.total_articles, twitter: @friend.twitter }
    end

    assert_response 201
  end

  test "should show friend" do
    get :show, id: @friend
    assert_response :success
  end

  test "should update friend" do
    put :update, id: @friend, friend: { email: @friend.email, first_name: @friend.first_name, last_name: @friend.last_name, total_articles: @friend.total_articles, twitter: @friend.twitter }
    assert_response 204
  end

  test "should destroy friend" do
    assert_difference('Friend.count', -1) do
      delete :destroy, id: @friend
    end

    assert_response 204
  end
end
