require 'test_helper'

class PeppersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pepper = peppers(:one)
  end

  test "should get index" do
    get peppers_url
    assert_response :success
  end

  test "should get new" do
    get new_pepper_url
    assert_response :success
  end

  test "should create pepper" do
    assert_difference('Pepper.count') do
      post peppers_url, params: { pepper: {  } }
    end

    assert_redirected_to pepper_url(Pepper.last)
  end

  test "should show pepper" do
    get pepper_url(@pepper)
    assert_response :success
  end

  test "should get edit" do
    get edit_pepper_url(@pepper)
    assert_response :success
  end

  test "should update pepper" do
    patch pepper_url(@pepper), params: { pepper: {  } }
    assert_redirected_to pepper_url(@pepper)
  end

  test "should destroy pepper" do
    assert_difference('Pepper.count', -1) do
      delete pepper_url(@pepper)
    end

    assert_redirected_to peppers_url
  end
end
