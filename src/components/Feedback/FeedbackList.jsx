
import React from 'react';
import { useFeedback } from '@/context/FeedbackContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MessageCircle, Check, X } from 'lucide-react';

const FeedbackList = ({ userId, isAdmin = false }) => {
  const { getAllFeedback, getUserFeedback, updateFeedbackStatus } = useFeedback();
  
  const feedbackList = isAdmin ? getAllFeedback() : getUserFeedback(userId);

  if (feedbackList.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <MessageCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-3 text-lg font-semibold">No feedback yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {isAdmin ? "When users submit feedback, it will appear here." : "After you submit feedback, it will appear here."}
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleUpdateStatus = (feedbackId, newStatus) => {
    updateFeedbackStatus(feedbackId, newStatus);
  };

  return (
    <div className="space-y-4">
      {feedbackList.map((feedback) => (
        <Card key={feedback.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base">{feedback.userName || 'Anonymous'}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {new Date(feedback.date).toLocaleString()}
                </p>
              </div>
              <Badge 
                className={
                  feedback.status === 'approved' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                  feedback.status === 'rejected' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                  'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }
              >
                {feedback.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{feedback.text}</p>
            
            {isAdmin && feedback.status === 'pending' && (
              <div className="mt-4 flex items-center gap-2">
                <Button 
                  size="sm" 
                  onClick={() => handleUpdateStatus(feedback.id, 'approved')}
                  className="h-8 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="mr-1 h-4 w-4" />
                  Approve
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleUpdateStatus(feedback.id, 'rejected')}
                  className="h-8 bg-red-600 hover:bg-red-700 text-white"
                >
                  <X className="mr-1 h-4 w-4" />
                  Reject
                </Button>
              </div>
            )}
            
            <Separator className="my-4" />
            <p className="text-xs text-muted-foreground">
              Feedback ID: {feedback.id.substring(0, 8)}...
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeedbackList;
