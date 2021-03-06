/* Generated by Opal 0.10.5 */
(function(Opal) {
  function $rb_divide(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass;

  Opal.add_stubs(['$==', '$%', '$/', '$debug', '$<=', '$>=', '$-']);
  return (function($base, $super) {
    function $EclipsePhase(){};
    var self = $EclipsePhase = $klass($base, $super, 'EclipsePhase', $EclipsePhase);

    var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2, TMP_3, TMP_4, TMP_5;

    Opal.defn(self, '$initialize', TMP_1 = function $$initialize() {
      var $a, $b, self = this, $iter = TMP_1.$$p, $yield = $iter || nil, $zuper = nil, $zuper_index = nil, $zuper_length = nil;

      TMP_1.$$p = null;
      $zuper = [];
      
      for($zuper_index = 0; $zuper_index < arguments.length; $zuper_index++) {
        $zuper[$zuper_index] = arguments[$zuper_index];
      }
      return ($a = ($b = self, Opal.find_super_dispatcher(self, 'initialize', TMP_1, false)), $a.$$p = $iter, $a).apply($b, $zuper);
    }, TMP_1.$$arity = 0);

    Opal.defn(self, '$gameName', TMP_2 = function $$gameName() {
      var self = this;

      return "エクリプス・フェイズ";
    }, TMP_2.$$arity = 0);

    Opal.defn(self, '$gameType', TMP_3 = function $$gameType() {
      var self = this;

      return "EclipsePhase";
    }, TMP_3.$$arity = 0);

    Opal.defn(self, '$getHelpMessage', TMP_4 = function $$getHelpMessage() {
      var self = this;

      return "1D100<=m 方式の判定で成否、クリティカル・ファンブルを自動判定\n";
    }, TMP_4.$$arity = 0);

    return (Opal.defn(self, '$check_1D100', TMP_5 = function $$check_1D100(total_n, dice_n, signOfInequality, diff, dice_cnt, dice_max, n1, n_max) {
      var $a, self = this, diceValue = nil, dice_ten_place = nil, dice_one_place = nil, diff_threshold = nil;

      if (signOfInequality['$==']("<=")) {
        } else {
        return ""
      };
      diceValue = total_n['$%'](100);
      dice_ten_place = $rb_divide(diceValue, 10);
      dice_one_place = diceValue['$%'](10);
      self.$debug("total_n", total_n);
      self.$debug("dice_ten_place, dice_one_place", dice_ten_place, dice_one_place);
      if (dice_ten_place['$=='](dice_one_place)) {
        if (diceValue['$=='](99)) {
          return " ＞ 決定的失敗"};
        if (diceValue['$=='](0)) {
          return " ＞ 00 ＞ 決定的成功"};
        if ((($a = $rb_le(total_n, diff)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          return " ＞ 決定的成功"};
        return " ＞ 決定的失敗";};
      diff_threshold = 30;
      if ((($a = ($rb_le(total_n, diff))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        if ((($a = $rb_ge(total_n, diff_threshold)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          return " ＞ エクセレント"};
        return " ＞ 成功";
        } else {
        if ((($a = $rb_ge(($rb_minus(total_n, diff)), diff_threshold)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          return " ＞ シビア"};
        return " ＞ 失敗";
      };
    }, TMP_5.$$arity = 8), nil) && 'check_1D100';
  })($scope.base, $scope.get('DiceBot'))
})(Opal);

/* Generated by Opal 0.10.5 */
(function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return $scope.get('Kernel').$exit()
})(Opal);
